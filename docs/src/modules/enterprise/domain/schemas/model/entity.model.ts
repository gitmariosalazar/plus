export class EntityModel {
  private idEntity: number;
  private ruc: string;
  private name: string;
  private email: string;
  private cellphone: string;
  private telephone: string;
  private address: string;
  private description: string;
  private createdAt?: Date;
  private updatedAt?: Date;

  constructor(
    idEntity: number,
    ruc: string,
    name: string,
    email: string,
    cellphone: string,
    telephone: string,
    address: string,
    description: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.idEntity = idEntity;
    this.ruc = ruc;
    this.name = name;
    this.email = email;
    this.cellphone = cellphone;
    this.telephone = telephone;
    this.address = address;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getIdEntity(): number {
    return this.idEntity;
  }

  getRuc(): string {
    return this.ruc;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getCellphone(): string {
    return this.cellphone;
  }

  getTelephone(): string {
    return this.telephone;
  }

  getAddress(): string {
    return this.address;
  }

  getDescription(): string {
    return this.description;
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  setIdEntity(idEntity: number): void {
    this.idEntity = idEntity;
  }

  setRuc(ruc: string): void {
    this.ruc = ruc;
  }

  setName(name: string): void {
    this.name = name;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setCellphone(cellphone: string): void {
    this.cellphone = cellphone;
  }

  setTelephone(telephone: string): void {
    this.telephone = telephone;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  toJSON(): object {
    return {
      idEntity: this.idEntity,
      ruc: this.ruc,
      name: this.name,
      email: this.email,
      cellphone: this.cellphone,
      telephone: this.telephone,
      address: this.address,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
