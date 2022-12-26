class User < ApplicationRecord
    has_many :courses, dependent: :destroy
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :first_name, presence: true 
    validates :last_name, presence: true 
    validates :email, presence: true, uniqueness: true 
end
