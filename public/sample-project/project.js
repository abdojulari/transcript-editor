window.PROJECT = {"name":"Sample Project","description":"A web app for transcripts that were automatically generated from speech-to-text software","logo":"","apiUrl":"","useVendorAudio":true,"transcriptsPerPage":500,"maxLineTimeOverlapMs":-1,"allowTranscriptDownload":true,"gaCode":"","adminEmails":["admin@email.org"],"authProviders":[],"consensus":{"maxLineEdits":5,"minLinesForConsensus":3,"minLinesForConsensusNoEdits":5,"minPercentConsensus":0.34,"lineDisplayMethod":"guess","superUserHiearchy":50},"menus":{"header":[{"label":"Browse","url":"/"},{"label":"About","url":"/page/about"}],"footer":[{"label":"Privacy Policy","url":"#","target":"_blank"},{"label":"Terms and Conditions","url":"#","target":"_blank"}]},"modals":{},"controls":[{"id":"toggle-play","action":"lineToggle","label":"Play/Pause","keyCode":32,"key":"[shift] + [space]","keyLabel":"Shift + Space Bar","keyDescription":"Hold shift and press space bar to play, pause, or re-play a line","shift":true},{"id":"next-line","action":"lineNext","label":"Next Line","keyCode":[13,40],"key":"[\u0026#8595;] OR [enter]","keyLabel":"Down Arrow or Enter Key","keyDescription":"Press the down arrow key or enter to go to next line"},{"id":"previous-line","action":"linePrevious","label":"Prev Line","keyCode":38,"key":"\u0026#8593;","keyLabel":"Up Arrow","keyDescription":"Press the up arrow key to go to previous line"},{"id":"previous-word","action":"wordPrevious","label":"Prev Word","keyCode":37,"key":"[shift] + [\u0026#8592;]","keyLabel":"Shift + Left Arrow","keyDescription":"Hold shift and press the left arrow key to move to previous word","shift":true},{"id":"next-word","action":"wordNext","label":"Next Word","keyCode":39,"key":"[shift] + [\u0026#8594;]","keyLabel":"Shift + Right Arrow","keyDescription":"Hold shift and press the right arrow key to move to next word","shift":true}],"pages":{"about.md":"\u003ch1\u003eAbout This Project\u003c/h1\u003e\n\n\u003cp\u003eYou can write about your project in \u003ca href=\"https://daringfireball.net/projects/markdown/syntax\"\u003eMarkdown\u003c/a\u003e\u003c/p\u003e\n","home.md":"\u003ch1\u003eMy Project Title\u003c/h1\u003e\n\n\u003cp\u003eHelp us fix computer-generated transcripts\u003c/p\u003e\n","footer.md":"\u003cp\u003ePowered By \u003ca href=\"https://github.com/NYPL/transcript-editor\"\u003eOpen Transcript Editor\u003c/a\u003e with generous support from:\u003c/p\u003e\n\n\u003cp\u003e\u003ca href=\"http://www.knightfoundation.org/grants/201551666/\"\u003e\u003cimg src=\"/oral-history/assets/img/knightfoundation_logo.png\" alt=\"Knight Foundation\" /\u003e\u003c/a\u003e\u003c/p\u003e\n","transcript_finished.md":"\u003cp\u003e\u003ca href=\"#finished\" class=\"button large transcript-finished\" role=\"button\"\u003eI am finished with this transcript!\u003c/a\u003e\u003c/p\u003e\n\n\u003cdiv class=\"show-when-finished\" aria-hidden=\"true\"\u003e\n  \u003cp\u003eThank you so much for your contributions! Your edits have been saved and will now be reviewed by others. The final transcript is one step closer completion!\u003c/p\u003e\n\n  \u003ca href=\"/\" class=\"button large\" role=\"button\"\u003eBrowse More Transcripts\u003c/a\u003e\n\u003c/div\u003e\n","transcript_edit.md":"\u003ch2\u003eInstructions\u003c/h2\u003e\n\n\u003cp\u003eThe following transcript was automatically generated using speech-to-text software, so there are probably errors. This tool will allow you to listen while you edit the transcript. For your convenience (we hope), the audio will automatically pause after each line.\u003c/p\u003e\n\n\u003cp\u003eUse the keyboard shortcuts or buttons in the toolbar below to navigate the transcript and audio. \u003cspan class=\"highlight\"\u003eAll your edits will be automatically saved\u003c/span\u003e but may not be immediately visible by others. Once enough people agree on the text of a particular line, that line will be visible to all and no longer editable.\u003c/p\u003e\n\n\u003cp\u003e\u003c% if (transcript.hasLinesInReview) { %\u003e\nThe transcript contains lines that are \u0026quot;in review\u0026quot; (\u003cspan class=\"reviewing\"\u003ehighlighted in orange\u003c/span\u003e) which means you cannot edit it, but can select the best transcription from a list of submitted edits.\n\u003c% } %\u003e\n\u003c% if (transcript.hasLinesCompleted) { %\u003e\nThe transcript \u003c% if (transcript.hasLinesInReview) { %\u003ealso \u003c% } %\u003econtains lines that are \u0026quot;completed\u0026quot; (\u003cspan class=\"completed\"\u003ehighlighted in green\u003c/span\u003e) which means they have been corrected by others and can no longer be edited, but you can still listen to them.\n\u003c% } %\u003e\u003c/p\u003e\n\n\u003cp class=\"text-center\"\u003e\u003ca href=\"#start\" class=\"button large start-play disabled\" role=\"button\"\u003eOkay, let's start\u003c/a\u003e\u003c/p\u003e\n","transcription_conventions.md":"\u003ctable class=\"table-conventions\"\u003e\n  \u003cthead\u003e\n    \u003ctr\u003e\n      \u003cth colspan=\"2\"\u003eTranscription Conventions\u003c/th\u003e\n      \u003cth\u003eExamples\u003c/th\u003e\n    \u003c/tr\u003e\n  \u003c/thead\u003e\n  \u003ctbody\u003e\n    \u003ctr\u003e\n      \u003ctd\u003eContractions\u003c/td\u003e\n      \u003ctd\u003eTranscribe as you hear them\u003c/td\u003e\n      \u003ctd\u003e“Shoulda”, “Didn’t”\u003c/td\u003e\n    \u003c/tr\u003e\n    \u003ctr\u003e\n      \u003ctd\u003eNumbers\u003c/td\u003e\n      \u003ctd\u003eTranscribe as numerals\u003c/td\u003e\n      \u003ctd\u003e“11 West 40th Street”\u003cbr /\u003e“She was 40 years old.”\u003c/td\u003e\n    \u003c/tr\u003e\n    \u003ctr\u003e\n      \u003ctd\u003eFilled Pauses \u0026amp; Hesitations\u003c/td\u003e\n      \u003ctd\u003eTranscribe as you hear them\u003c/td\u003e\n      \u003ctd\u003e“ah”, “eh”, “um”\u003c/td\u003e\n    \u003c/tr\u003e\n    \u003ctr\u003e\n      \u003ctd\u003eNoise\u003c/td\u003e\n      \u003ctd\u003eTranscribe in brackets; use descriptive language\u003c/td\u003e\n      \u003ctd\u003e“And then we [door slam]”, “So cold! [Brrrrr]”\u003c/td\u003e\n    \u003c/tr\u003e\n    \u003ctr\u003e\n      \u003ctd\u003ePartial words\u003c/td\u003e\n      \u003ctd\u003eIf someone stops speaking in the middle of a word, transcribe as much of the word as they say; follow it with a dash\u003c/td\u003e\n      \u003ctd\u003e“Tes- Testing”, “Absolu- Absolutely”\u003c/td\u003e\n    \u003c/tr\u003e\n    \u003ctr\u003e\n      \u003ctd\u003eHard-to-understand\u003c/td\u003e\n      \u003ctd\u003eFor speech that is difficult or impossible to understand, use question marks before and after\u003c/td\u003e\n      \u003ctd\u003e“And she told me that ?I should just leave?”, “Her name was ?inaudible?”\u003c/td\u003e\n    \u003c/tr\u003e\n  \u003c/tbody\u003e\n\u003c/table\u003e\n"}};