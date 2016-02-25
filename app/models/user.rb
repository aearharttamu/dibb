class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
 has_many :bibliographs
 
 def admin?
   self.admin == true
 end
 
 def self.get_all()
   users = User.all.order('email')
	 users.map { |user| user.obj }
 end
  
 def obj
   {
     id: self.id,
     email: self.email,
     admin: self.admin?
   }
 end 
end
