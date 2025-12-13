export const generateUnits = () => {
  const generatedUnits = [];
  // Lantai 1-3, Kamar 1-5 per lantai
  for (let floor = 1; floor <= 3; floor++) {
    for (let room = 1; room <= 8; room++) {
      generatedUnits.push({
        id: `0${floor}-${room}`,
        floor: floor,
        number: room,
        label: `Unit 0${floor}-${room}`,
      });
    }
  }
  return generatedUnits;
};
