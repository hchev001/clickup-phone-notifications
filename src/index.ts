import 'dotenv/config';
import express from 'express';
import axios from 'axios';

const app = express();
const port = 5002;

app.get('/', (req, res) => {
  res.status(200).send();
});

app.get('/spaces', (req, res) => {
  axios.get('https://api.clickup.com/api/v2/team', { headers: { Authorization: `${process.env.CLICKUP_TOKEN}` } })
    .then(async (response) => {
      interface Clickup_User {
        id: number;
        email: string;
        username: string;
      }
      const { members, id } = response.data.teams[0];
      members.forEach((member:any) => {
        const { user }: {user: Clickup_User} = member;
        // console.log(user);
      });

      const teamInfo = await axios.get(`https://api.clickup.com/api/v2/team/${id}/space?archived=false`, { headers: { Authorization: `${process.env.CLICKUP_TOKEN}` } });

      const spaceInfo = await axios.get(`https://api.clickup.com/api/v2/space/${process.env.SPACE_ID}/list?archived=false`, { headers: { Authorization: `${process.env.CLICKUP_TOKEN}` } });

      // returns {lists: [{id}]}
      const tasks: any[] = [];
      const taskLists: any[] = [];
      spaceInfo.data.lists.forEach(async (list: { id: any; }) => {
        const listReq = axios.get(`https://api.clickup.com/api/v2/list/${list.id}/task?archived=fals`, { headers: { Authorization: `${process.env.CLICKUP_TOKEN}` } });
        taskLists.push(listReq);
      });

      Promise.all(taskLists).then((results) => {
        const returnedTasks: any[] = [];
        results.forEach((result) => {
          returnedTasks.push(...result.data.tasks);
        });
        res.status(200).send(returnedTasks);
      }).catch((err) => {
        console.error(err);
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send(err);
    });
});

app.listen(port, () => console.log('Listening on port 5002'));
