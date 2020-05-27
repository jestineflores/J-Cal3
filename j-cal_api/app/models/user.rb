class User < ApplicationRecord
    has_secure_password
    has_one :calendar
    has_many :event, through: :calendar
end
