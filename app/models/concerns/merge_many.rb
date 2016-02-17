module MergeMany
  extend ActiveSupport::Concern

  included do
  end

  # Merge changes from the client into the target has_many relation 
  def merge_many_changes( target_class, foreign_key, original_list, proposed_list )
    proposed_list = [] if proposed_list.nil? 
    deleted_items = original_list.map { |item| item.id }
    
    proposed_list.each { |proposed_item|
      if proposed_item[:id].nil?
        # add place
        proposed_item[foreign_key] = self.id
        item = target_class.new(proposed_item)
        item.save
      else
        # update place        
        item = target_class.where("id = ? and #{foreign_key} = ?", proposed_item[:id], self.id ).first
        unless item.nil?
          item.update(proposed_item)
          deleted_items.delete(item.id)
          item.save
        end
      end
    }

    # delete items not found in the proposed list
    target_class.destroy(deleted_items)
  end

  # methods defined here are going to extend the class, not the instance of it
  module ClassMethods


  end

end