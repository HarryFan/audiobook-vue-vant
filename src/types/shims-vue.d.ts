declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
  export default component
}

declare module 'vue' {
  export interface DefineComponent<Props, Setup, Data> {
    new (...args: any[]): {
      $props: Props
    }
  }
  
  export function defineComponent(options: any): any
  export function ref<T>(value: T): { value: T }
  export function reactive<T>(obj: T): T
  export function computed<T>(getter: () => T): { value: T }
  export function onMounted(fn: () => void): void
  export function watch(source: any, callback: any, options?: any): any
}

declare module 'vue-router' {
  export function useRouter(): any
  export function useRoute(): any
}

declare module 'vant' {
  export const Button: any
  export const Icon: any
  export const Image: any
  export const NavBar: any
  export const Tag: any
  export const Rate: any
  export const Tabs: any
  export const Tab: any
  export const DropdownMenu: any
  export const DropdownItem: any
  export const Cell: any
  export const CellGroup: any
  export const Loading: any
  export const List: any
  export const Dialog: any
  export const Form: any
  export const Field: any
  export const Checkbox: any
  export const Popup: any
  
  export const showToast: (options: any) => void
  export const showDialog: (options: any) => Promise<void>
}

// JSX 类型声明
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
