// ********************************
// ************* TYPE *************
// ********************************

export type __AttachmentType = {
  id: number;
  file: string;
  alt?: string;
  type: __AttachmentTypeEnum;
  usage: __AttachmentUsageEnum;
};

export enum __AttachmentTypeEnum {
  image = 1,
  document = 2,
  video = 3,
  audio = 4,
  archive = 5,
}

export enum __AttachmentUsageEnum {
  content = 1,
  ticket,
  profile,
  event,
}

export type __ProfileType = {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
};

// ********************************
// ************* ENUM *************
// ********************************
