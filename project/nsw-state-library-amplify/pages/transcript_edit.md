## Instructions

* Here you can listen to audio files from the Library's collections. Click the **Play All button** to listen alongside a transcript.
* The transcript was **computer generated using speech-to-text software** and contains errors.
* You can use this tool to **edit a transcript line by line** as you listen along.
* **All your edits will be automatically saved** but may not be immediately visible by others. Don't forget to **Track Your Progress** (top right corner) if you want to keep a tally of all your edits.
* Once **three or more people** have transcribed – and agreed – on the text for an individual line it will be visible to all but no longer editable.
<% if (transcript.hasLinesInReview) { %>
* When a line of the transcript is in "in review" (<span class="reviewing">highlighted in orange</span>) you will not be able to edit it but instead can select the best transcription from a list of submitted edits.
<% } %>
<% if (transcript.hasLinesCompleted) { %>
* When a line of the transcript is marked as "completed" (<span class="completed">highlighted in green</span>) this means it has already been corrected by others and can no longer be edited, but you can still listen to them.
<% } %>

<p class="text-center"><a href="#tutorial" data-modal="tutorial_edit" class="button large modal-invoke tutorial-link" role="button">View Tutorial</a> <span class="separator">- or -</span> <a href="#start" class="button large start-play disabled" role="button">Start Transcribing</a></p>

<p class="text-center"><a href="#play-all" class="button large play-all disabled" role="button">Play All</a></p>
