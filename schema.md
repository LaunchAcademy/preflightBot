- Users
  * chat_id
  * name
  * team_id
  * *has_many* submissions
- Lessons
  * slug
  * *has_many* submissions
- Submissions
  * url
  * *belongs_to* lesson
  * *belongs_to* user
  * timestamps