<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $reqest)
    {
        $validator = Validator::make($reqest->all(),[
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255'
        ]);

        if($validator->fails()){
            return response()->json([$validator->errors(), 'success'=>false]);
        }

        $user = User::create([
            'username'=> $reqest->username,
            'email'=> $reqest->email,
            'password'=> Hash::make($reqest->password),
            'first_name'=> $reqest->first_name,
            'last_name'=> $reqest->last_name,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['data'=> $user, 'success'=>true, 'access_token'=> $token, 'token_type'=> 'Bearer']);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        
        if(!Auth::attempt($request->only('email','password'))){
            return response()->json(['success'=>false]);
        }

        $user = User::where('email', $request->input('email'))->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['success'=>true, 'user'=>$user, 'access_token'=> $token, 'token_type'=> 'Bearer']);
    }

    public function logout(Request $request)
    {
       $request->user()->tokens()->delete();
       return response()->json(['message'=> 'Successfully logged out!']);
    }

    public function forgotPassword(Request $request)
    {   
        $request->validate([
          'email' => 'required',
          'new_password' => 'required|string|min:8'
        ]);

        try {
            $user = User::where('email', $request->input('email')) -> firstOrFail();

            if ($request->email == $user->email) {
                $user->password = Hash::make($request->new_password);
                $user->save();
            }

            return response()->json(['message' => 'Password successfully changed.']);
        } catch (\Exception $e) {
            return response()->json(['errors' => $e->getMessage()], 500);
        }
    }
}
