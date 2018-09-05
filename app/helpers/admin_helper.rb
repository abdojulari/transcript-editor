module AdminHelper
  # rubocop:disable Metrics/LineLength, Metrics/MethodLength, Metrics/AbcSize
  def side_menu
    list = [
      OpenStruct.new(path: "/admin", icon: "line-chart", text: "Dashboard", type: 1),
      OpenStruct.new(path: admin_users_path, icon: "users", text: "User", type: 2),
      OpenStruct.new(path: admin_cms_path, icon: "list-ul", text: "CMS", type: 2),
      OpenStruct.new(path: admin_institutions_path, icon: "university", text: "Institutions", type: 2),
      OpenStruct.new(path: admin_pages_path, icon: "file", text: "Pages", type: 4),
      OpenStruct.new(path: admin_themes_path, icon: "paint-brush", text: "Themes", type: 4),
      OpenStruct.new(path: edit_admin_app_config_path(@app_config.id), icon: "cog", text: "Site Config", type: 4),
      OpenStruct.new(path: "/page/user_guide", icon: "question-circle", text: "User Guide", type: 2),
    ]
    list.reject { |i| i.type > user_type }
  end
  # rubocop:enable Metrics/LineLength, Metrics/MethodLength, Metrics/AbcSize

  def publish_icon(status)
    icon = status ? "globe" : "file-text"
    fa_icon icon
  end

  private

  def user_type
    # 1 -> moderator (first level)
    # 2 -> content editors (second level)
    # 3 -> admins (top level)
    if current_user.admin?
      4
    elsif current_user.content_editor?
      3
    elsif current_user.moderator?
      1
    end
  end
end
