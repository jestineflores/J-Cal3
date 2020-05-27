class CreateCalendars < ActiveRecord::Migration[6.0]
  def change
    create_table :calendars do |t|
      t.refrences :user, index: true, foreign_key: true
    end
  end
end