import { PaymentStatusEnum } from "@/gx/signals/studentsCardForm.signal";
import { baseURL } from "../api";

export const cardsStatuses = {
  SUBMITTED: "SUBMITTED",
  INFORMATIONS_VALIDATED: "INFORMATIONS_VALIDATED",
  AVAILABLE: "AVAILABLE",
  PRINTED: "PRINTED",
  RECEIVED: "RECEIVED",
  INVALID: "INVALID",
} as const;

export type CardStatusesType = (typeof cardsStatuses)[keyof typeof cardsStatuses];

export interface ICard {
  id: string;
  matricule: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  sex: string;
  status: CardStatusesType;
  birthDate: Date;
  birthPlace: string;
  nationality: string;
  createdAt: Date;
  updatedAt: Date;
  academicYear: number;
  sector: string;
  faculty: string;
  paymentStatus: PaymentStatusEnum;
}

/**
 * Student Card representation
 */
export default class Card {
  private _id: string;
  private _matricule: string;
  private _code: string;
  private _name: string;
  private _email: string;
  private _phone: string;
  private _avatar: string;
  private _sex: string;
  private _status: CardStatusesType;
  private _birthDate: Date;
  private _birthPlace: string;
  private _nationality: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _academicYear: number;
  private _sector: string;
  private _faculty: string;
  private _paymentStatus: PaymentStatusEnum;

  constructor(data: ICard) {
    this._id = data.id;
    this._matricule = data.matricule;
    this._code = data.code;
    this._name = data.name;
    this._email = data.email;
    this._phone = data.phone;
    this._avatar = data.avatar;
    this._sex = data.sex;
    this._status = data.status;
    this._birthDate = data.birthDate;
    this._birthPlace = data.birthPlace;
    this._nationality = data.nationality;
    this._createdAt = data.createdAt;
    this._updatedAt = data.updatedAt;
    this._academicYear = data.academicYear;
    this._sector = data.sector;
    this._faculty = data.faculty;
    this._paymentStatus = data.paymentStatus;
  }

  // Getters
  get id() {
    return this._id;
  }

  get matricule() {
    return this._matricule;
  }

  get code() {
    return this._code;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get phone() {
    return this._phone;
  }

  get avatar() {
    return this._avatar;
  }

  get avatarLink() {
    return `${baseURL}${this.avatar}`;
  }

  get sex() {
    return this._sex;
  }

  get status() {
    return this._status;
  }

  get birthDate() {
    return this._birthDate;
  }

  get birthPlace() {
    return this._birthPlace;
  }

  get nationality() {
    return this._nationality;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  get academicYear() {
    return this._academicYear;
  }

  get sector() {
    return this._sector;
  }

  get faculty() {
    return this._faculty;
  }

  get paymentStatus() {
    return this._paymentStatus;
  }

  public toJson() {
    return {
      id: this._id,
      matricule: this._matricule,
      code: this._code,
      name: this._name,
      email: this._email,
      phone: this._phone,
      avatar: this._avatar,
      sex: this._sex,
      status: this._status,
      birthDate: this._birthDate,
      birthPlace: this._birthPlace,
      nationality: this._nationality,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      academicYear: this._academicYear,
      sector: this._sector,
      faculty: this._faculty,
      paymentStatus: this._paymentStatus,
    };
  }
}
