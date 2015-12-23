class Genre
	def self.all()
		return [
			{ text: "Print Monograph", value: "print-monograph", type: "single-item"},
			{ text: "Digital Monograph", value: "digital-monograph", type: "single-item"},
			{ text: "Print Serial", value: "print-serial", type: "serial-list"},
			{ text: "Digital Serial", value: "digital-serial", type: "serial-list"},
			{ text: "Print Volume", value: "print-volume", type: "volume-list"},
			{ text: "Digital Volume", value: "digital-volume", type: "volume-list"},
			{ text: "Other", value: "other", type: "single-item"}
		]
	end
end