import { getToast, Toasts } from "~/utils/toasts";

export const useAuthManager = () => {
	const supabase = useSupabaseClient();
	const toast = useToast();

	const signInWithEmail = async (email: string, password: string) => {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			toast.add(getToast(Toasts.ERROR, error.message));
			return false;
		}
		toast.add(getToast(Toasts.SUCCESS, "You have been signed in."));
		return true;
	};

	const signUpWithPassword = async (email: string, password: string) => {
		const { error } = await supabase.auth.signUp({ email, password });
		if (error) {
			toast.add(getToast(Toasts.ERROR, error.message));
			return false;
		}
		toast.add(getToast(Toasts.SUCCESS, "You have been signed up."));
		return true;
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			toast.add(getToast(Toasts.ERROR, error.message));
			return false;
		}
		toast.add(getToast(Toasts.SUCCESS, "You have been signed out."));
		return true;
	};

	return {
		signInWithEmail,
		signUpWithPassword,
		signOut,
	};
};
