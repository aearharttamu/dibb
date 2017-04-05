class DelayedJob <  ActiveRecord::Base

	def self.in_progress
		DelayedJob.count() > 0
	end

end