window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["account.ejs"] = '<% if (user.signedIn) { %>  <div class="select">    <div class="select-active" title="Signed in as <%= user.name %>"><%= user.name %></div>    <div class="select-options account-menu menu">      <a href="#sign-out" class="sign-out-link select-option menu-item">Sign out</a>    </div>  </div><% } else { %>  <div class="select">    <div class="select-active">Sign in with</div>    <div class="select-options account-menu menu">      <% _.each(project.auth_providers, function(provider) { %>        <a href="#sign-in-with-<%= provider.name %>" data-provider="<%= provider.name %>" class="auth-link select-option menu-item" data-active="Signing In..."><%= provider.label %></a>      <% }) %>    </div>  </div><% } %>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["crumbs.ejs"] = '<% _.each(crumbs, function(crumb){ %>  <% if (crumb.url) { %>    <a href="<%= crumb.url %>" class="crumb">  <% } else { %>    <div class="crumb">  <% } %>    <% if (crumb.image) { %>      <div class="crumb-image"><img src="<%= crumb.image %>" alt="<%= crumb.label %> Icon" /></div>    <% } %>    <div class="crumb-label"><%= crumb.label %></div>  <% if (crumb.url) { %>    </a>  <% } else { %>    </div>  <% } %><% }) %>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["menu.ejs"] = '<% if (project.menus && project.menus[menu_key] && project.menus[menu_key].length) { %>  <div class="<%= menu_key %>-menu menu">    <% _.each(project.menus[menu_key], function(item) { %>      <a href="<%= item.url %>" class="menu-item"><%= item.label %></a>    <% }) %>  </div><% } %>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["page.ejs"] = '<% if (project.pages[page_key]) { %>  <div class="<%= page_key %> page">    <%= project.pages[page_key] %>  </div><% } %>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["header_title.ejs"] = '<% if (project.logo) { %>  <a href="/" title="<%= project.name %>" class="title"><img src="<%= project.logo %>" alt="" class="logo" /></a><% } else { %>  <h1 class="title"><a href="/"><%= project.name %></a></h1><% } %>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["transcript_edit.ejs"] = '<% if (page_content) { %><div class="transcript-page">  <%= page_content %></div><% } %><div class="transcript-lines">  <% _.each(transcript.transcript_lines, function(line) { %>    <%= template_line(line) %>  <% }) %></div>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["transcript_item.ejs"] = '<a href="#<%= path %>" class="transcript-item" title="<%= title %> <%= description %>">  <div class="item-image" style="background-image: url(<%= image_url %>)"></div>  <div class="item-title"><%= title %></div>  <% if (description) { %>    <div class="item-description"><%= description %></div>  <% } %>  <div class="item-info"><%= UTIL.formatTime(duration) %></div></a>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["transcript_line.ejs"] = '<div sequence="<%= sequence %>" class="line">  <div class="time"><%= UTIL.formatTimeMs(start_time) %></div>  <% if (text) { %>    <div class="text final"><%= text %></div>  <% } else if (hasOwnProperty("user_text")) { %>    <div class="text user"><input type="text" value="<%= user_text %>" /></div>  <% } else { %>    <div class="text"><input type="text" value="<%= original_text %>" /></div>  <% } %></div>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["transcript_list.ejs"] = '<div class="transcript-list">  <% _.each(transcripts, function(transcript) { %>    <%= template_item(transcript) %>  <% }) %></div><% if (has_more) { %><a href="#more" class="list-next button">Load More</a><% } %>';
window.TEMPLATES=window.TEMPLATES || {}; window.TEMPLATES["transcript_toolbar.ejs"] = '<div class="transcript-toolbar">  <div class="mode">    <label>Continous Play</label>    <div class="onoffswitch">      <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="continuous-play-switch">      <label class="onoffswitch-label" for="continuous-play-switch">        <span class="onoffswitch-inner"></span>        <span class="onoffswitch-switch"></span>      </label>    </div>  </div>  <div class="notifications">Loading transcript...</div>  <div class="controls">    <% _.each(controls, function(control){ %>      <div class="control <%= control.id %>">        <div class="key" title="<%= control.keyLabel %>"><%= control.key %></div>        <div class="label"><%= control.label %></div>      </div>    <% }) %>  </div></div>';