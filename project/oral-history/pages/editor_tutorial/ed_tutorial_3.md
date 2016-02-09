# Commands

A number of commands allow you to navigate the interview's audio and transcript. These appear at the top of the screen as buttons. You can also call these commands with the following keyboard shortcuts.

<table class="table-commands">
    <% _.each(project.controls, function(control) { %>
    <tr>
        <td><%= control.keyLabel %></td>
        <td><%= control.keyDescription %></td>
    </tr>
    <% }) %>
</table>
