export const Result = {
    ok(data) {
        return { success: true, data };
    },
    fail(error) {
        return { success: false, error };
    },
};
