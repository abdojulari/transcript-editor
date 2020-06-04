class DeleteInstitutionJob < ApplicationJob
  queue_as :default

  def perform(institution_name, institution_id, user_email)
    institution = Institution.find_by id: institution_id
    institution&.destroy

    DeleteInstitutionMailer.perform(institution_name, user_email).deliver_now
  end
end
