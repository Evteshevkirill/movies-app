declare module 'lodash' {
  export function round(value: number, precision?: number): number
  export function debounce(func: Function, wait: number): Function
}

declare module 'date-fns' {
  export function format(date: Date, format: string): string
}

declare module 'antd' {
  export const Rate: any
  export const Alert: any
  export const Spin: any
  export const Pagination: any
  export const Tabs: any
}
