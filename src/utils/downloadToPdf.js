import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { LogoImage, KopImage } from '../configs/images';

const downloadToPdf = (dataExportPDF, attr, title, fileName, thnAjar = "", kelas = "", date = "" ) => {
    let name = fileName + ' ' + moment().format('DD-MM-yyyy');
    const doc = new jsPDF('potrait');

    doc.autoTable({
        head: [attr],
        body: dataExportPDF,
        headStyles: {
            fontSize: 9,
            fillColor: [255, 255, 255],
            textColor: 0
        },
        styles: {
            lineColor: [234, 234, 234]
        },
        bodyStyles: {
            fillColor: [255, 255, 255],
            fontSize: 9,
        },
        alternateRowStyles: {
            fillColor: [255, 255, 255]
        },
        
        didDrawPage: function(data) {
            doc.addImage(KopImage, 'PNG', 12, 5, 200, 35);
            doc.setFontSize(11);
            doc.setFont('Times New Roman');
            doc.setLineWidth(0.8);
            doc.line(0, 50, 300, 50);
            doc.setFont('Times New Roman', 'bold');
            doc.text(title, 6, 60);
            doc.setFont('Times New Roman', 'normal');
            doc.text(`Depok, ${moment().format('dddd DD MMMM YYYY')}`, 6, 65);
            doc.text(`Depok, ${moment().format('dddd DD MMMM YYYY')}`, 150, 240);
            doc.text(`Trihadi Sulaksono, ST. M.M`, 150, 270);
            doc.setFont('Times New Roman', 'bold');
            doc.text(`Kepala Sekolah`, 150, 275);
            doc.setFontSize(10);
        },
        margin: { top: 70, right: 4, left: 4, bottom: 5 }
    });
    
    doc.save(name + '.pdf');
}

export default downloadToPdf;