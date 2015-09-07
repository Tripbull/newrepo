<?php
include_once('class/class.main.php');
include_once('class/PHPExcel.php');
$objPHPExcel = new PHPExcel();
$user_tz = '';
$connect = new db();
$connect->db_connect();


$controller = new fucn();
//$date1 = '2013-06-05';
//$date2 = '2013-06-27';

if(isset($_REQUEST['id'])){
	$placeId = $_REQUEST['id'];
	$sql = "SELECT name,email FROM businessCustomer_$placeId WHERE 1 GROUP BY email ORDER BY id DESC";
	$result = mysql_query($sql) or die(mysql_error());
	
	$ratingTextTemp = array('Name', 'Email');

	$array_col = array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");	
	$r=0;$c=1;
	foreach( $ratingTextTemp as $val )  
		$objPHPExcel->setActiveSheetIndex(0)->setCellValue($array_col[$r++] . $c, encodequote($val));
	
    $c=3;
	while($row = mysql_fetch_object($result)){
	    $r=0;
		$colrow = array($row->name,$row->email);
			
		foreach( $colrow as $val ){
			$objPHPExcel->setActiveSheetIndex(0)->setCellValue($array_col[$r++] . $c, $val);
		}	
		$c++;
	}
		
		$filename = 'followers.xlsx';
		$objPHPExcel->getActiveSheet()->setTitle('data');
		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		header('Content-type: application/vnd.ms-excel');
		header('Content-Disposition: attachment; filename="'.$filename.'"');
		$objWriter->save('php://output'); 
}
$connect->db_disconnect();
function encodequote($str){
	$str = str_replace('<double>','"',str_replace("<quote>","'",$str));
	$str = str_replace("<comma>",',',$str);
	return $str;
}
?>