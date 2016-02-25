class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
 has_many :bibliographs
 
 def admin?
   self.admin == true
 end
 
 def enabled?
   self.enabled == true
 end
 
 def self.get_all()
   users = User.all.order('email')
	 users.map { |user| user.obj }
 end
  
 def obj
   {
     id: self.id,
     email: self.email,
     last_sign_in_at: self.last_sign_in_at,
     admin: self.admin?,
     enabled: self.enabled?
   }
 end 
end
