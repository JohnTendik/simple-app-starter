export const allAccess = (req: any, res: any) => {
  res.status(200).send("Public Content.");
};

export const userBoard = (req: any, res: any) => {
  res.status(200).send("User Content.");
};

export const adminBoard = (req: any, res: any) => {
  res.status(200).send("Admin Content.");
};

export const moderatorBoard = (req: any, res: any) => {
  res.status(200).send("Moderator Content.");
};