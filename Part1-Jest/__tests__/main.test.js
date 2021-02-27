const formatVolumeIconPath = require('../assets/scripts/main');
describe('main.js test', () => { 
    test('over 66', () => { 
        expect(formatVolumeIconPath(67)).toMatch(/3/);
    });

    test('under 67 over 33', () => { 
        expect(formatVolumeIconPath(34)).toMatch(/2/);
    });

    test('under 34', () => { 
        expect(formatVolumeIconPath(33)).toMatch(/1/);
    });

    test('under 1', () => { 
        expect(formatVolumeIconPath(0)).toMatch(/0/);
    });
});