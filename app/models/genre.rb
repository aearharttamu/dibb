class Genre
	def self.all()
		return [
			{ text: "Print Monograph", value: "print-monograph", type: "single"},
			{ text: "Digital Monograph", value: "digital-monograph", type: "single"},
			{ text: "Print Serial", value: "print-serial", type: "serial"},
			{ text: "Digital Serial", value: "digital-serial", type: "serial"},
			{ text: "Print Volume", value: "print-volume", type: "volume"},
			{ text: "Digital Volume", value: "digital-volume", type: "volume"},
			{ text: "Other", value: "other", type: "single"}
		]
	end
end