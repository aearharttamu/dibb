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

ActiveRecord::Schema.define(version: 20151221214958) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "biblio_sets", force: :cascade do |t|
    t.string   "title"
    t.string   "genre"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
