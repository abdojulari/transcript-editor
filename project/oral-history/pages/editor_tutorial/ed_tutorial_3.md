# Commands

A number of commands allow you to navigate the interview's audio and transcript. These commands are available as keyboard shortcuts and the toolbar along the bottom of the screen.

<table class="table-commands">
    <% _.each(project.controls, function(control) { %>
    <tr>
        <td><%= control.keyLabel %></td>
        <td><%= control.keyDescription %></td>
    </tr>
    <% }) %>
</table>
