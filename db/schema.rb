# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160330191537) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "biblio_sets", force: :cascade do |t|
    t.string   "title"
    t.string   "genre"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "other_genre"
  end

  create_table "bibliographs", force: :cascade do |t|
    t.string   "name"
    t.integer  "node_count"
    t.string   "schema_version"
    t.integer  "user_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "biblios", force: :cascade do |t|
    t.integer  "biblio_set_id"
    t.string   "item_as_appears"
    t.integer  "item_number"
    t.string   "title"
    t.text     "descriptors"
    t.string   "date_as_appears"
    t.integer  "year"
    t.integer  "publisher_id"
    t.string   "provenance"
    t.string   "pub_number"
    t.integer  "size"
    t.string   "binding"
    t.boolean  "pagination"
    t.boolean  "unnumbered_pages"
    t.text     "contents"
    t.string   "category_as_appears"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.string   "pub_number_type"
  end

  create_table "citations", force: :cascade do |t|
    t.integer  "title_id"
    t.integer  "biblio_id"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.text     "full_text"
    t.integer  "page_number"
    t.string   "originating_page_number_as_appears"
    t.string   "ending_page_number_as_appears"
    t.integer  "category_id"
    t.text     "notes"
    t.integer  "page_num_sequence_id"
  end

  create_table "currencies", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer  "priority",   default: 0, null: false
    t.integer  "attempts",   default: 0, null: false
    t.text     "handler",                null: false
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "delayed_jobs", ["priority", "run_at"], name: "delayed_jobs_priority", using: :btree

  create_table "editions", force: :cascade do |t|
    t.integer  "format_id"
    t.integer  "currency_id"
    t.decimal  "price"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "title_id"
  end

  create_table "formats", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "page_num_sequences", force: :cascade do |t|
    t.integer  "biblio_id"
    t.string   "first_page_number_as_appears"
    t.integer  "first_page_number"
    t.string   "final_page_number_as_appears"
    t.integer  "final_page_number"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  create_table "people", force: :cascade do |t|
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "full_name"
    t.string   "first_name"
    t.string   "middle_name"
    t.string   "last_name"
    t.string   "alternative_name"
  end

  create_table "publication_places", force: :cascade do |t|
    t.string  "city"
    t.string  "state"
    t.string  "country"
    t.integer "biblio_id"
  end

  create_table "publishers", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "name"
  end

  create_table "roles", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "staffs", force: :cascade do |t|
    t.integer  "biblio_id"
    t.integer  "person_id"
    t.integer  "role_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "title_id"
  end

  create_table "titles", force: :cascade do |t|
    t.integer  "publisher_id"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "name"
    t.boolean  "is_review"
    t.text     "review_full_text"
    t.string   "serial_title"
    t.string   "serial_volume_as_appears"
    t.string   "serial_issue_as_appears"
    t.integer  "encompassing_title_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.boolean  "admin"
    t.boolean  "enabled"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
