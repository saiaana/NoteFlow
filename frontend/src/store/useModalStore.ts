import { create } from "zustand";

interface ModalState {
  isLogoutModalOpen: boolean;
  openLogoutModal: () => void;
  closeLogoutModal: () => void;

  isDeleteModalOpen: boolean;
  noteId: string | null;
  openDeleteModal: (id: string) => void;
  closeDeleteModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isLogoutModalOpen: false,
  openLogoutModal: () => set({ isLogoutModalOpen: true }),
  closeLogoutModal: () => set({ isLogoutModalOpen: false }),

  isDeleteModalOpen: false,
  noteId: null,
  openDeleteModal: (id) => set({ isDeleteModalOpen: true, noteId: id }),
  closeDeleteModal: () => set({ isDeleteModalOpen: false, noteId: null }),
}));
