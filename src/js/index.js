import '../style/index.scss';

export default function a() {
    const a = 123
    const b = 445;
    const e = function() {
        this.a = a;
        this.b = b;
        const c = this.a + this.b
    }
    new e();
}
