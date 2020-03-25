<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Hash;


class AuthController extends Controller
{
    public function login(Request $request){
	
		$client = new \GuzzleHttp\Client();

		try {

			$response = $client->request('POST', 'localhost:8001/oauth/token', [
	    		'form_params' => [
	        		'grant_type' => 'password',
	        		'client_id' => '2',
	        		'client_secret' => '71q9cbjYuon5886zVUcx7N4a2chbEUL5hE7G945T',
	        		'username' => $request->username,
	        		'password' => $request->password
	        ]
	    ]);
		
			return json_decode((string) $response->getBody(), true);

		} catch (\GuzzleHttp\Exception\BadResponseException $e){
			if ($e->getCode() === 400) {
				return response()->json('Your credientials are incorrect. Please try again', $e->getCode());
			} 

			return response()->json("Oops. Something went wrong on the server", $e->getCode());
		}
	


	}

	public function register(Request $request){

		$request->validate([
			'name' => 'required|string|max:255',
			'email' => 'required|string|email|max:255|unique:users',
			'password' => 'required|string|min:6|'
		]);

		return User::create([
			'name' => $request->name,
			'email' => $request->email,
			'password' => Hash::make($request->password)
		]);
	}

	public function logout(){
		auth()->user()->tokens->each(function ($token, $key){
			$token->delete();
		});

		return response()->json("Logged out",200);
	}
   
}
