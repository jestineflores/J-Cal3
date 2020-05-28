class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string "name"
      t.string "location"
      t.time "start_time"
      t.time "end_time"
      t.references :user, null: false, foreign_key: true
    end
  end
end
