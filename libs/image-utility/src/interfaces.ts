export type ImageDB = {
  image_id:number;
  filename:string;
  filetype:string;
}

export type Image = {
  filename:string;
  filetype:string;
}

export type ImageAllocation = {
  image_id: number;
  image_url: string;
}

/* 

CREATE TABLE images(
    image_id SERIAL PRIMARY KEY,
    filename VARCHAR(255),
    filetype VARCHAR(255)
)

*/