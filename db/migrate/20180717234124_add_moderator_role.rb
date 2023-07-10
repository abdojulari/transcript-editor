class AddModeratorRole < ActiveRecord::Migration[5.2]
  def change
    UserRole.where(
      name: 'content_editor', hiearchy: 80,
      description: 'Content editor can edit content'
    ).first_or_create
  end
end
