import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface ITable {
  content: string;
  align: 'left' | 'right';
  child?: ITable[];
}

export interface IDateRange {
  start: NgbDateStruct;
  end: NgbDateStruct;
}

export interface ITimeRange {
  begin?: ITime;
  end?: ITime;
}

export interface ITime {
  hour: number;
  min: number;
}

export interface IOverlay<T> {
  config?: T;
  callbacks?: any;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface IModal {
  type: 'alert' | 'normal' | 'info';
  title?: string;
  content?: string;
  cancel?: string;
  confirm?: string;
  scroll?: boolean;
  close?: boolean;
}

export interface IBreadrumb {
  path: string;
  name: string;
}

export interface IMenuItem {
  key: string;
  i18n: string;
  path?: string;
  roles?: string[];
}

export interface IESOP {
  home: {
    // home: IMenuItem;
    guideline: IMenuItem;
  };
  trading?: {
    i18n: string;
    menu: IMenuItem[];
  };
  accountManage?: {
    i18n: string;
    menu: IMenuItem[];
  };
  esopAccount?: {
    i18n: string;
    menu: IMenuItem[];
  };
  document?: {
    i18n: string;
    menu: IMenuItem[];
  };
  manageCenter?: {
    i18n: string;
    menu: IMenuItem[];
  };
}

export interface NameMappingItem<T = string> {
  key: T;
  i18n: string;
}

export interface INotificationPageInfo {
  next: number;
  previous: number;
}

export interface IHyperlinkMenuItem {
  name: string;
  event?: (e: any) => void;
}
