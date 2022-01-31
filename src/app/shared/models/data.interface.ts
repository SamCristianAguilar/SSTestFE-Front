
export interface Data1 {
  T1C1?: number;
  T1C2: string;
  T1C3?: number;
  T1C4?: Date;
}

export interface DataSend1 {
  id: number,
  T1C1?: number;
  T1C2: string;
  T1C3?: number;
  T1C4?: Date;
}

export interface Data2 {
  T2C1?: number;
  T2C2?: string;
  T2C3?: number;
  T2C4: Date;
  T2C5: number;
}
export interface DataSend2 {
  id: number,
  T2C1?: number;
  T2C2?: string;
  T2C3?: number;
  T2C4: Date;
  T2C5: number;
}

export interface Data3 {
  T3C1?: number;
  T3C2: string;
  T3C3: Date;
}
export interface DataSend3 {
  id: number;
  T3C1?: number;
  T3C2: string;
  T3C3: Date;
}
