import { doSocialLogin } from '@/app/actions';
import React from 'react';





const SocialLogin = () => {
    return (
        <form action={doSocialLogin}>
            <button className="bg-pink-400 w-full text-white p-1 rounded-md m-1 text-lg" type="submit" name="action" value="google">
                Sign In With Google
            </button>

            {/* <button className="bg-black text-white p-1 rounded-md m-1 text-lg" type="submit" name="action" value="github">
                Sign In With GitHub
            </button> */}
        </form>
    );
};

export default SocialLogin;