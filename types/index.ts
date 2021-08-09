import { NextPage } from "next";

export interface Class {
  class_id: string;
  name: string;
  subject: string;
  teacher_id: number;
}

export type PageComponent<P> = NextPage<P> & { auth: boolean };
