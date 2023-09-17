const fimData = {
    loginResponse: {
        "tenant_discovery_endpoint": "https://login.microsoftonline.com/de810bec-18a3-479a-8c6f-185945c981d3/v2.0/.well-known/openid-configuration",
        "api-version": "1.1",
        "metadata": [
            {
                "preferred_network": "login.microsoftonline.com",
                "preferred_cache": "login.windows.net",
                "aliases": [
                    "login.microsoftonline.com",
                    "login.windows.net",
                    "login.microsoft.com",
                    "sts.windows.net"
                ]
            },
            {
                "preferred_network": "login.partner.microsoftonline.cn",
                "preferred_cache": "login.partner.microsoftonline.cn",
                "aliases": [
                    "login.partner.microsoftonline.cn",
                    "login.chinacloudapi.cn"
                ]
            },
            {
                "preferred_network": "login.microsoftonline.de",
                "preferred_cache": "login.microsoftonline.de",
                "aliases": [
                    "login.microsoftonline.de"
                ]
            },
            {
                "preferred_network": "login.microsoftonline.us",
                "preferred_cache": "login.microsoftonline.us",
                "aliases": [
                    "login.microsoftonline.us",
                    "login.usgovcloudapi.net"
                ]
            },
            {
                "preferred_network": "login-us.microsoftonline.com",
                "preferred_cache": "login-us.microsoftonline.com",
                "aliases": [
                    "login-us.microsoftonline.com"
                ]
            }
        ]
    },



    configurationResponse: {
        "token_endpoint": "https://login.microsoftonline.com/de810bec-18a3-479a-8c6f-185945c981d3/oauth2/v2.0/token",
        "token_endpoint_auth_methods_supported": [
            "client_secret_post",
            "private_key_jwt",
            "client_secret_basic"
        ],
        "jwks_uri": "https://login.microsoftonline.com/de810bec-18a3-479a-8c6f-185945c981d3/discovery/v2.0/keys",
        "response_modes_supported": [
            "query",
            "fragment",
            "form_post"
        ],
        "subject_types_supported": [
            "pairwise"
        ],
        "id_token_signing_alg_values_supported": [
            "RS256"
        ],
        "response_types_supported": [
            "code",
            "id_token",
            "code id_token",
            "id_token token"
        ],
        "scopes_supported": [
            "openid",
            "profile",
            "email",
            "offline_access"
        ],
        "issuer": "https://login.microsoftonline.com/de810bec-18a3-479a-8c6f-185945c981d3/v2.0",
        "request_uri_parameter_supported": false,
        "userinfo_endpoint": "https://graph.microsoft.com/oidc/userinfo",
        "authorization_endpoint": "https://login.microsoftonline.com/de810bec-18a3-479a-8c6f-185945c981d3/oauth2/v2.0/authorize",
        "device_authorization_endpoint": "https://login.microsoftonline.com/de810bec-18a3-479a-8c6f-185945c981d3/oauth2/v2.0/devicecode",
        "http_logout_supported": true,
        "frontchannel_logout_supported": true,
        "end_session_endpoint": "https://login.microsoftonline.com/de810bec-18a3-479a-8c6f-185945c981d3/oauth2/v2.0/logout",
        "claims_supported": [
            "sub",
            "iss",
            "cloud_instance_name",
            "cloud_instance_host_name",
            "cloud_graph_host_name",
            "msgraph_host",
            "aud",
            "exp",
            "iat",
            "auth_time",
            "acr",
            "nonce",
            "preferred_username",
            "name",
            "tid",
            "ver",
            "at_hash",
            "c_hash",
            "email"
        ],
        "kerberos_endpoint": "https://login.microsoftonline.com/de810bec-18a3-479a-8c6f-185945c981d3/kerberos",
        "tenant_region_scope": "NA",
        "cloud_instance_name": "microsoftonline.com",
        "cloud_graph_host_name": "graph.windows.net",
        "msgraph_host": "graph.microsoft.com",
        "rbac_url": "https://pas.windows.net"
    },

    tokenResponse: {
        "token_type": "Bearer",
        "scope": "profile openid email User.Read",
        "expires_in": 4316,
        "ext_expires_in": 4316,
        "access_token": "eyJ0eXAiOiJKV1QiLCJub25jZSI6InFFRXVnWllJQ2lrdzlRai03LWdIWVVVTVNSa3djYTF6cE9VV1lPSDRuak0iLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kZTgxMGJlYy0xOGEzLTQ3OWEtOGM2Zi0xODU5NDVjOTgxZDMvIiwiaWF0IjoxNjkzNjkwMDU0LCJuYmYiOjE2OTM2OTAwNTQsImV4cCI6MTY5MzY5NDY3MSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhVQUFBQXdLRStPSkJNdXUxNFNKSk5kNjJST1MwU1pyMmQrNWY3dk42SVZZbnFUdWlzeTUyUTg4cXNvQncweVk0U3BvSk4iLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkZ1ZWwgSW52ZW50b3J5IE1hbmFnZW1lbnQgKEZJTSkgVUkgLSBEZXYiLCJhcHBpZCI6IjdlOWVkYjYzLTE1ZWEtNDU4NS05YTU3LWE4ZjE5NDJkMDljMiIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiR3VudGFrYSIsImdpdmVuX25hbWUiOiJCaGFyZ2F2IiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMjYwMDo4ODA2OjJmMDA6MzAwOjVjYzc6YTQwMjozYTAzOmIyMGQiLCJuYW1lIjoiR3VudGFrYSwgQmhhcmdhdiAoQkJBLUNPUlAwOTgpIiwib2lkIjoiMWYxMzhkNDMtZGRkMS00Y2YyLWI3ZWEtNzM0NGFmOGIxMDRkIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTM5NDM0MDA2NjktMzk1NTU5MzgyOS0zNzY2MzQyNjQ3LTIwNDU4OTM3MiIsInBsYXRmIjoiNSIsInB1aWQiOiIxMDAzMjAwMjEwQzcyMDE1IiwicmgiOiIwLkFRUUE3QXVCM3FNWW1rZU1ieGhaUmNtQjB3TUFBQUFBQUFBQXdBQUFBQUFBQUFBRUFINC4iLCJzY3AiOiJVc2VyLlJlYWQgcHJvZmlsZSBvcGVuaWQgZW1haWwiLCJzdWIiOiJOVmVLR1dhR3E4OXUtZ3RPemtQRFhPaE84Tk1EUFVPR0JYeGZYeWhrcVFzIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6Ik5BIiwidGlkIjoiZGU4MTBiZWMtMThhMy00NzlhLThjNmYtMTg1OTQ1Yzk4MWQzIiwidW5pcXVlX25hbWUiOiJsbm5ycXBucEBiYmFhdmlhdGlvbi5uZXQiLCJ1cG4iOiJsbm5ycXBucEBiYmFhdmlhdGlvbi5uZXQiLCJ1dGkiOiJ0TWtLdmZIbzVVUzJnQ21nMGxvc0FBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX3N0Ijp7InN1YiI6ImdFaWxyR3N4LVBlNTdFTFpwNzR6dEM3WGdRWnNDWHZrRlhaTVZ1MGZfMVEifSwieG1zX3RjZHQiOjEzNjYzODQxNjB9.AcbxCNf-0O-foFr_1AaynA_pAHr3KKiwpE5HhtYM0I_lyuwIzIcCJID8XHYOSpUNUxWCBGq26Tfo8H3yIvD2bcZfeV7qlAx4Bj35ooc62o5Dy8647AGJfbHygN0X4ji8y8CBNOVduY4Qzk3lzttSKJYRJC_Q9c6aizJlAl3eicMsyhRopd_LT03U6mNwipGLygTgMAh3eS8f2VdEToydXxKVrKBokkml8zS9pBdL5CVN41JINwYcz_cXyN2jFfNHcoN38A6EPam1fvMKhIs8ygUBA2oynGCXetu5q0MP2EYZLDErQK9Tk8WRzenEoq--witVYXgMVAJNui7S0yJrig",
        "refresh_token": "0.AQQA7AuB3qMYmkeMbxhZRcmB02Pbnn7qFYVFmleo8ZQtCcIEAH4.AgABAAEAAAAtyolDObpQQ5VtlI4uGjEPAgDs_wUA9P-GpxA_qdJONr2qGienLqdW3n48gc6VAOMovTt315X7kU7_-x0ER6ybgtxFRcmFtQfnIyczFgKA4CQdUQmBJ1CI673p59qscG9OnqHkDG1ErwDHm_k6DAy5Vx5BFQXFXxgejPaQ64_gJ7epv30HpmbvJM5WWGzDPIpB9wRhjIWfa_vczVDmKtOCti5DY8RIlt9QFOjP_QxNFdYOYFkN1sEDV5NshStAcOXxx0JfUXKrAkJWseHoqUSq18fsYsEjoAchuDIOvmMh0brLUsj-vv8Lx7gMtJrhOrzulTFl2S0NQUNQ85ebdlz4FKQBHwqlToES_PoiyV0RS9YHe19VpkcM_NZoefg6CGjRZnD0PbyF16hD8ATEQgOMW6MuvuTCBLaLfGNrW1_eIu7ywKoj8W8vs6GtDPCoQPbKpTYc1-tvAdAXRI_8usSsvIs9AogK5Lcdk3kgf1kCzZRzTCheMimv5dOLsvTjANbsWb9igejmqGm-J2FE5tRfjiHweO9yZ9ys0CUutpazLYtdMMDrCwQcz-2yN88GMlni0FcqrB9izrRZ4IQj8HbhVeKx2dfDmWEI5PwQguuPgUdDwqHAcEMUJdDHMe66Sle0n3cs7epj3zFHxPh5L7gw6uelf-nSnejB62xrqp-DjMsGZmxNnEYg9EPUO9t_FnFfMXVhaKB6ZbjovcAMDbJ8tJe8nAhJIV1OB6IJ7D0UkpkdkYNf3jriiOK_KwFxj6mZQAz2DfymV434Lb0o8_0d_6ihxsJnMEaiNJ1zITSK6Ej-6OCZ8hebIL5tQxy_ACOOFUAI977IKI0ex05XqR-tDNICNqaqZuaP6dWst5kXr58KBVGhLFbHOWbjmNChXVnv_EAkAQZ33Zcv1ync",
        "id_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiI3ZTllZGI2My0xNWVhLTQ1ODUtOWE1Ny1hOGYxOTQyZDA5YzIiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vZGU4MTBiZWMtMThhMy00NzlhLThjNmYtMTg1OTQ1Yzk4MWQzL3YyLjAiLCJpYXQiOjE2OTM2OTAwNTQsIm5iZiI6MTY5MzY5MDA1NCwiZXhwIjoxNjkzNjkzOTU0LCJhaW8iOiJBVVFBdS84VUFBQUF4Z2hSYWFHRlQ2dEs1bnV6MTZEOFZEYk1ORXRIY3p1V25zRUg0L1V0d3M3Vk9JN2s4VGdhMUNCZzBEZU5HSEJHcm40SElzYzZYR0NNUyt0SjZyOTVIUT09IiwiYXV0aF90aW1lIjoxNjkzNjkwMzUzLCJuYW1lIjoiR3VudGFrYSwgQmhhcmdhdiAoQkJBLUNPUlAwOTgpIiwibm9uY2UiOiJlNjQ0YjI0YS0yMDEwLTRjMzEtYTE2NC1lMjFiY2Q1YzhjNTEiLCJvaWQiOiIxZjEzOGQ0My1kZGQxLTRjZjItYjdlYS03MzQ0YWY4YjEwNGQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJsbm5ycXBucEBiYmFhdmlhdGlvbi5uZXQiLCJyaCI6IjAuQVFRQTdBdUIzcU1ZbWtlTWJ4aFpSY21CMDJQYm5uN3FGWVZGbWxlbzhaUXRDY0lFQUg0LiIsInN1YiI6ImdFaWxyR3N4LVBlNTdFTFpwNzR6dEM3WGdRWnNDWHZrRlhaTVZ1MGZfMVEiLCJ0aWQiOiJkZTgxMGJlYy0xOGEzLTQ3OWEtOGM2Zi0xODU5NDVjOTgxZDMiLCJ1dGkiOiJ0TWtLdmZIbzVVUzJnQ21nMGxvc0FBIiwidmVyIjoiMi4wIn0.OgC6gK70Onn1I9x0KvRiy0QoGU3C8-J_kM0dQ4lgag9eSERV3osm9O4FAgVSP_KVJGR8uUaj1rc3vgfaSjPGKOKWocjM_QcfjVE95GB8M4HTGzIBZyDfOhjr2ZsUZtDYAk4H22fTofotMxDVmNeZhK8QMkg9urZHsd6i7h4qNQKP1eWmxFDahkA6QHky6j40hBzjm-10iKO9XE2bcbtVCcFqFW3IPb4MaFTRY2oqO0Pe-eSpi1y89vPM--ln3NzuhIp-aEy9cGM9aa2nWxeSVgJKetALL7ikIYUZq5CblSst9fbud2RkdrXeV2txzsGpzaaBhv8N4m7PSbs4eudoNQ",
        "client_info": "eyJ1aWQiOiIxZjEzOGQ0My1kZGQxLTRjZjItYjdlYS03MzQ0YWY4YjEwNGQiLCJ1dGlkIjoiZGU4MTBiZWMtMThhMy00NzlhLThjNmYtMTg1OTQ1Yzk4MWQzIn0"
    }
}

export default fimData;