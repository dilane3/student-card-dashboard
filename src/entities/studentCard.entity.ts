import { baseURL } from "../api";

export interface ICard {
  id: string;
  matricule: string;
  code: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  sex: string;
  birthDate: Date;
  nationality: string;
  createdAt: Date;
  updatedAt: Date;
  academicYear: number;
  sector: string;
  faculty: string;
}

/**
 * Student Card representation
 */
export default class Card {
  private _id: string;
  private _matricule: string;
  private _code: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _phone: string;
  private _avatar: string;
  private _sex: string;
  private _birthDate: Date;
  private _nationality: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _academicYear: number;
  private _sector: string;
  private _faculty: string;

  constructor(data: ICard) {
    this._id = data.id
    this._matricule = data.matricule
    this._code = data.code
    this._firstName = data.firstName
    this._lastName = data.lastName
    this._email = data.email
    this._phone = data.phone
    this._avatar = data.avatar
    this._sex = data.sex
    this._birthDate = data.birthDate
    this._nationality = data.nationality
    this._createdAt = data.createdAt
    this._updatedAt = data.updatedAt
    this._academicYear = data.academicYear
    this._sector = data.sector
    this._faculty = data.faculty
  }

  // Getters
  get id() {
    return this._id;
  }

  get matricule() {
    return this._matricule
  }

  get code() {
    return this._code
  }

  get firstName() {
    return this._firstName
  }

  get lastName() {
    return this._lastName
  }

  get email() {
    return this._email
  }

  get phone() {
    return this._phone
  }

  get avatar() {
    return this._avatar
  }

  avatarLink() {
    return `${baseURL}/${this._avatar}`;
  }

  get sex() {
    return this._sex
  }

  get birthDate() {
    return this._birthDate
  }

  get nationality() {
    return this._nationality
  }

  get createdAt() {
    return this._createdAt
  }

  get updatedAt() {
    return this._updatedAt
  }

  get academicYear() {
    return this._academicYear
  }

  get sector() {
    return this._sector
  }

  get faculty() {
    return this._faculty
  }

  public toJson() {
    return {
      id: this._id,
      matricule: this._matricule,
      code: this._code,
      firstName: this._firstName,
      lastName: this._lastName,
      email: this._email,
      phone: this._phone,
      avatar: this._avatar,
      sex: this._sex,
      birthDate: this._birthDate,
      nationality: this._nationality,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      academicYear: this._academicYear,
      sector: this._sector,
      faculty: this._faculty
    }
  }
}