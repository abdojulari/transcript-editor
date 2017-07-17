module UidValidationOnUpdate
  def uid_not_changed
    if persisted? && changed.include?("uid")
      errors.add(:uid, "cannot be updated")
    end
  end
end
