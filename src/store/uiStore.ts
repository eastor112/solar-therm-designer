import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface UIState {
  version: string
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
  theme: 'dark' | 'light'
  setTheme: (theme: 'dark' | 'light') => void
  modalComponent: JSX.Element | undefined
  setModalComponent: (modalComponent: JSX.Element | undefined) => void
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        version: '1.0.0',
        openModal: false,
        setOpenModal: (openModal: boolean) => set({ openModal }),
        theme: 'light',
        setTheme: (theme: 'dark' | 'light') => set({ theme }),
        setModalComponent: (modalComponent: JSX.Element | undefined) => set({ modalComponent }),
        modalComponent: undefined
      }),
      {
        name: 'uiStore',
        partialize: (state) => {
          const { openModal, modalComponent, ...rest } = state;
          return rest;
        },
      },
    ),
  ),
)
