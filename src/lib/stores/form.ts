import { writable } from 'svelte/store';

export const isFormValid = writable(false);
export const step = writable(1);
export const isLoading = writable(false);
export const customButtons = writable(false);
export const lossType = writable<'autoloss' | 'homeloss' | null>(null);
