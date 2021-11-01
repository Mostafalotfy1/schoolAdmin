import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';
import { createProfile } from '../../src/reduxs/Actions/patientProfile';
import { useEffect, useState } from "react";
import {useSelector,useDispatch} from 'react-redux';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  name: faker.name.findName(),
  NationalId: faker.name.findName(),
  Email: faker.name.findName(),
  SeeMessage: faker.name.findName(),
  // role: sample([
  //   'Leader',
  //   'Hr Manager',
  //   'UI Designer',
  //   'UX Designer',
  //   'UI/UX Designer',
  //   'Project Manager',
  //   'Backend Developer',
  //   'Full Stack Designer',
  //   'Front End Developer',
  //   'Full Stack Developer'
  // ])
}));
// const users = ()=>{
//   // eslint-disable-next-line react-hooks/rules-of-hooks
// const ProTyps = useSelector((state) => state.PatientProfile.patientProfile)
// console.log(ProTyps)
// // eslint-disable-next-line react-hooks/rules-of-hooks
// const dispatch = useDispatch()
// // eslint-disable-next-line react-hooks/rules-of-hooks
// useEffect(() => {
//   dispatch(createProfile())
// }, [])
//   return(
//     {
//       ProTypsmap((_, index) => ({
//          return(
//           id: faker.datatype.uuid(),
//           avatarUrl: mockImgAvatar(index + 1),
//           name: faker.name.findName(),
//           company: faker.company.companyName(),
//           isVerified: faker.datatype.boolean(),
//           status: sample(['active', 'banned']),
//           role: sample([
//             'Leader',
//             'Hr Manager',
//             'UI Designer',
//             'UX Designer',
//             'UI/UX Designer',
//             'Project Manager',
//             'Backend Developer',
//             'Full Stack Designer',
//             'Front End Developer',
//             'Full Stack Developer'
//           ])
//          )
//         })
//     }
//   )
// }

export default users;
