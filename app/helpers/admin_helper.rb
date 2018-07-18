module AdminHelper
  def side_menu
    # rubocop:disable Metrics/LineLength
    list = [
      OpenStruct.new(path: "/admin", icon: "line-chart", text: "Dashboard", type: 1),
      OpenStruct.new(path: admin_users_path, icon: "users", text: "User", type: 2),
      OpenStruct.new(path: admin_cms_path, icon: "list-ul", text: "CMS", type: 2),
      OpenStruct.new(path: admin_institutions_path, icon: "university", text: "Institutions", type: 2),
      OpenStruct.new(path: admin_pages_path, icon: "file", text: "Pages", type: 4),
      OpenStruct.new(path: admin_themes_path, icon: "paint-brush", text: "Themes", type: 4),
    ]
    # rubocop:enable Metrics/LineLength
    list.reject { |i| i.type > user_type }
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
