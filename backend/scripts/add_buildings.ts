// import { Apartment, ApartmentWithId } from '@common/types/db-types';
// import { db } from '../src/firebase-config';
// // import db from '../dbConfigs';
// import buildingData from '../src/data/buildings.json';

// const buildingCollection = db.collection('buildings');
// // import ApartmentsCollection from '../models/Apartment';

// type BuildingData = {
//   id: number;
//   name: string;
//   landlordId: number;
//   address: string;
//   area: string;
// };

// const getAreaType = (areaName: string): 'COLLEGETOWN' | 'WEST' | 'NORTH' | 'DOWNTOWN' | 'OTHER' => {
//   switch (areaName.toUpperCase()) {
//     case 'COLLEGETOWN':
//       return 'COLLEGETOWN';
//     case 'WEST':
//       return 'WEST';
//     case 'NORTH':
//       return 'NORTH';
//     case 'DOWNTOWN':
//       return 'DOWNTOWN';
//     default:
//       return 'OTHER';
//   }
// };

// const formatBuilding = ({
//   id,
//   name,
//   landlordId,
//   address,
//   area,
// }: BuildingData): ApartmentWithId => ({
//   id: id.toString(),
//   name,
//   address,
//   landlordId: landlordId.toString(),
//   numBaths: 0,
//   numBeds: 0,
//   photos: [],
//   area: getAreaType(area),
// });

// const makeBuilding = async (apartmentWithId: ApartmentWithId) => {
//   try {
//     const { id, ...rest } = apartmentWithId;
//     const doc = buildingCollection.doc(id);
//     const building = rest as Apartment;
//     doc.set({ ...building });
//   } catch (err) {
//     console.log(err);
//   }
// };

// buildingData.map((building) => makeBuilding(formatBuilding(building)));
