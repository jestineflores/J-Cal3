class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string "event"
      t.string "location"
      t.datetime "end_time"
      t.datetime "end_time"
      t.refrences :calendar, foreign_key: true
    end
  end
end
