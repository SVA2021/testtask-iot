export interface AuthI {
    email: string
    password: string
    personal_data_access: boolean
}

export interface AuthResponseI {
    msg: string
    data: {
        access_token: string
        token_type: "Bearer"
        expires_at: number
    }
}

export interface DeviceI {
    id: number
    name: string
    updated_at: number
    // last_active: number | string
}

export interface DeviceResponseI {
    data: {
        metering_devices: {
            data: DeviceI[]
        }
    }
}

export const URL_LOGIN = 'https://core.nekta.cloud/api/auth/login';
export const URL_DEVICES = 'https://core.nekta.cloud/api/device/metering_devices';
export const TEST_EMAIL = 'demo@nekta.cloud';
export const TEST_PWD = 'qwertyqwerty';
export const TEST_REQUEST = {
    "page": 1,
    "last_page": 0,
    "sort_field": "id",
    "sort": "desc",
    "search_string": null,
    "device_state": "all",
    "is_archived": false,
    "paginate": true,
    "append_fields": ["active_polling", "attributes", "tied_point"],
    "per_page": 10
};
