import 'dotenv/config';
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import db from './database/models/instance';
import models from './database/models';

const app = express();
const port = 5002;

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send();
});

app.get('/spaces', (req, res) => {
  // fetch the team from clickup
  axios
    .get('https://api.clickup.com/api/v2/team', {
      headers: { Authorization: `${process.env.CLICKUP_TOKEN}` },
    })
    .then(async (response) => {
            interface Clickup_User {
                id: number
                email: string
                username: string
            }

            // get the team members and the id?
            const { members, id } = response.data.teams[0];
            members.forEach((member: any) => {
              // access the user data of the member
              const { user }: { user: Clickup_User } = member;
            });

            const teamInfo = await axios.get(
              `https://api.clickup.com/api/v2/team/${id}/space?archived=false`,
              { headers: { Authorization: `${process.env.CLICKUP_TOKEN}` } },
            );

            const spaceInfo = await axios.get(
              `https://api.clickup.com/api/v2/space/${process.env.SPACE_ID}/list?archived=false`,
              { headers: { Authorization: `${process.env.CLICKUP_TOKEN}` } },
            );

            // returns {lists: [{id}]}
            const tasks: any[] = [];
            const taskLists: any[] = [];
            spaceInfo.data.lists.forEach(async (list: { id: any }) => {
              const listReq = axios.get(
                `https://api.clickup.com/api/v2/list/${list.id}/task?archived=fals`,
                {
                  headers: {
                    Authorization: `${process.env.CLICKUP_TOKEN}`,
                  },
                },
              );
              taskLists.push(listReq);
            });

            Promise.all(taskLists)
              .then((results) => {
                const returnedTasks: any[] = [];
                results.forEach((result) => {
                  const task_list = result.data.tasks.map((task: any) => {
                    const {
                      id,
                      name,
                      description,
                      status,
                      date_created,
                      date_updated,
                      assignees,
                      due_date,
                      url,
                    } = task;

                    return {
                      id,
                      name,
                      status,
                      date_created,
                      date_updated,
                      due_date,
                      url,
                      assignees,
                    };
                  });

                  returnedTasks.push(task_list);
                });

                // return all the tasks at hand
                res.status(200).send(returnedTasks);
              })
              .catch((err) => {
                console.error(err);
              });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send(err);
    });
});

db.sequelize
  .authenticate()
  .then(() => Object.values(models).map((model) => model.sync()))
  .then(() => {
    app.listen(port, () => console.log('Listening on port 5002'));
  })
  .catch((e: any) => {
    console.log('Error connecting to db', e);
  });
