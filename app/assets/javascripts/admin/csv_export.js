(function () {
    class CsvButton {
        constructor(button) {
            this.button = button;
            this.page = 1;
            this.stopped = true;
            this.pages = [];
        }

        go() {
            this.stopped = true;
            this.page = 1;
            this.pages = [];
            this.doGo();
            this.doPage();
        }
        
        doGo() {
            this.button.setAttribute('data-orig-text', this.button.innerText);
            this.button.setAttribute('disabled', 'disabled');
        }

        doPage() {
            // @todo get params in here eh
            this.button.innerText = this.button.getAttribute('data-orig-text') + ` (fetching page ${this.page})`;
            fetch(`${this.button.getAttribute('data-csv-export-path')}?page=${this.page}`)
                .then((result) => result.text())
                .then((text) => {
                    this.pages.push(text);
                    const lines = text.split("\n").filter(x => x && x.length).length;
                    if (lines <= 1) {
                        this.stopped = true;
                        this.doStopped();
                    } else {
                        this.page += 1;
                        this.doPage();
                    }
                })
                .catch((e) => {
                    console.error(e);
                    this.stopped = true;
                });
        }

        doStopped() {
            this.button.innerText = this.button.getAttribute('data-orig-text') + ` (downloading)`;
            this.downloadContent();
            this.doFinished();
        }

        doFinished() {
            this.button.removeAttribute('disabled');
            this.button.innerText = this.button.getAttribute('data-orig-text');
        }

        compileCsv() {
            // @todo trim headers off
            return this.pages.join("\n");
        }

        downloadContent() {
            const blob = new Blob([this.compileCsv()], {
                type: "text/csv",
            });
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = "users-report.csv";
            link.innerHTML = "Click here to download the report";
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(blobUrl);
            }, 1000);
        }
    }
    
    const setupButton = (button) => {
        button.addEventListener('click', (e) => {
            const buttonDoer = new CsvButton(e.target);
            buttonDoer.go();
        }, false);
    };

    window.addEventListener('load', () => {
        document.querySelectorAll('[data-csv-export-path]').forEach((button) => {
            setupButton(button);
        })
    });
})();